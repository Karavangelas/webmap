#!/usr/bin/python3
import numpy as np
import pandas as pd

## From ISM/utils.py with some modification
def write_fasta(filename, seq_dict):
    with open(filename, 'w+') as f:
        for header in seq_dict:
            f.write('>{}\n'.format(header))
            f.write('{}\n'.format(seq_dict[header]))

def load_data(gisaid_filename):
    seq_list = read_alignment(gisaid_filename)
    seq_dict = {'gisaid_epi_isl': [], 'sequence': []}
    for header, seq in seq_list:
        header = header.split('|')[1]
        if header == 'NC_045512.2':
            REFERENCE = (header, seq)
            continue
        seq_dict['gisaid_epi_isl'].append(header)
        seq_dict['sequence'].append(seq)

    seq_df = pd.DataFrame.from_dict(seq_dict)
    return seq_df, REFERENCE

def load_data_nextstrain(gisaid_filename):
    seq_list = read_alignment(gisaid_filename)
    seq_dict = {'strain': [], 'sequence': []}
    for header, seq in seq_list:
        header = header.strip('\n')
        if len(header.split('|')) >= 2 and header.split('|')[1] == 'NC_045512.2':
            REFERENCE = ('NC_045512.2', seq)
            continue
        seq_dict['strain'].append(header)
        seq_dict['sequence'].append(seq)

    seq_df = pd.DataFrame.from_dict(seq_dict)
    return seq_df, REFERENCE

def preprocessing_nextstrain(seq_df, meta_df):
    # join sequence with metadate
    data_df = seq_df.join(meta_df.set_index(['strain']), on = ['strain'],how = 'left')
    # filter by Human, valid date time and convert date column to 'datetime' dtype
    data_df = data_df[data_df.apply(lambda x: (x['host'] == 'Human') and ('X' not in x['date']) and len(x['date'].split('-')) == 3, axis=1)]
    data_df = data_df[data_df.apply(lambda x: (x['host'] == 'Human') and ('X' not in x['date']) and len(x['date'].split('-')) == 3, axis=1)]
    data_df['country/region'] = data_df.apply(lambda x: 'Mainland China' if x['country'] == 'China' else x['country'], axis=1)
    data_df['country/region_exposure'] = data_df.apply(lambda x: 'Mainland China' if x['country_exposure'] == 'China' else x['country_exposure'], axis=1)

    data_df['date'] = pd.to_datetime(data_df['date'])
    data_df = data_df.rename(columns={'region': 'continent', 'region_exposure': 'continent_exposure'})
    data_df = data_df.drop(['virus', 'strain', 'genbank_accession', 'country', 'title', 'country_exposure'], axis = 1)
    return data_df

def preprocessing(seq_df, meta_df):
    # join sequence with metadate
    data_df = seq_df.join(meta_df.set_index(['gisaid_epi_isl']), on = ['gisaid_epi_isl'],how = 'left')
    # filter by Human, valid date time and convert date column to 'datetime' dtype
    data_df = data_df[data_df.apply(lambda x: (x['host'] == 'Human') and ('X' not in x['date']) and len(x['date'].split('-')) == 3, axis=1)]
    data_df = data_df[data_df.apply(lambda x: (x['host'] == 'Human') and ('X' not in x['date']) and len(x['date'].split('-')) == 3, axis=1)]
    data_df['country/region'] = data_df.apply(lambda x: 'Mainland China' if x['country'] == 'China' else x['country'], axis=1)
    data_df['country/region_exposure'] = data_df.apply(lambda x: 'Mainland China' if x['country_exposure'] == 'China' else x['country_exposure'], axis=1)

    data_df['date'] = pd.to_datetime(data_df['date'])
    data_df = data_df.rename(columns={'region': 'continent', 'region_exposure': 'continent_exposure'})
    data_df = data_df.drop(['virus', 'strain', 'genbank_accession', 'country', 'title', 'country_exposure'], axis = 1)
    return data_df

def read_fasta(filename):
    seq_list = []
    seq = ''
    with open(filename) as f:
        for line in f:
            if line[0] == '>':
                if len(seq) > 0:
                    seq_list.append((header, seq.upper()))
                    seq = ''
                    header = line[1:].strip('\n')
                else:
                    seq = ''
                    header = line[1:].strip('\n')
            else:
                seq += line.strip('\n').replace(' ', '').replace('-', 'N')
        if len(seq) > 0:
            seq_list.append((header, seq.upper()))
    return seq_list

def read_alignment(filename):
    seq_list = []
    seq = ''
    with open(filename) as f:
        for line in f:
            if line[0] == '>':
                if len(seq) > 0:
                    seq_list.append((header, seq.upper()))
                    seq = ''
                    header = line[1:].strip('\n')
                else:
                    seq = ''
                    header = line[1:].strip('\n')
            else:
                seq += line.strip('\n')
        if len(seq) > 0:
            seq_list.append((header, seq.upper()))
    return seq_list
