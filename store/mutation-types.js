export const TOKENS = '/tokens'
export const NFT_TOKEN_IDS = '/nft_token_ids'
export const NFT_METADATA = '/nft_metadata'
export const SEARCH = '/_search'

export const SALES_AGGREGATION = {
  'size': 0,
  'query': {'match': {'logs.action': 'eveSales'}},
  'aggs': {'byTokenName': {'terms': {'field': 'token_name.keyword', 'size': 20, 'min_doc_count': 3},
    'aggs': {
      'volume': {'sum': {'field': 'price'}},
      'avgPrice': {'avg': {'field': 'price'}},
      //'salesBucketSort': {'bucket_sort': {'sort': [{'avgPrice': 'desc'}]}},
      'salesPerDay': {
        'date_histogram': {'field': 'signed_date', 'interval': 'day'},
        'aggs': {
          'volume': {'sum': {'field': 'price'}},
          'byTokenId': {
            'terms': {'field': 'token_id.keyword', 'size': 15},
            'aggs': {
              'sellPrice': {'avg': {'field': 'price'}}
            }}}}}}}}

export const OFFERS_AGGREGATION = {
  'query': {'match': {'logs.action': 'eveNewSales'}},
  'aggs': {'byTokenName': {'terms': {'field': 'token_name.keyword', 'size': 20},
    'aggs': {'avgPrice': {'avg': {'field': 'logs.price'}},
      //'salesBucketSort': {'bucket_sort': {'sort': [{'avgPrice': 'desc'}]}},
      'salesPerDay': {'date_histogram': {'field': 'signed_date', 'interval': 'day'},
        'aggs': {'byTokenId': {'terms': {'field': 'token_id.keyword', 'size': 10},
          'aggs': {'sellPrice': {'avg': {'field': 'logs.price'}}}}}}}}},
          'size': 0}
