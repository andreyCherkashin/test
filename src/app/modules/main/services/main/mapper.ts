import { IMapper, ITrade } from '../../domains/models';

type TradeJson = {
  [key: string]: any;
};

function mapList<T, U>(mapper: IMapper<T, U>): (json: T[]) => U[] {
  return (json: T[]): U[] => {
    if (json) return json.map(mapper);
    return [];
  };
}

export const mapTrade = (json: TradeJson): ITrade => ({
  id: json.id,
  entryDate: new Date(json.entryDate),
  entryPrice: json.entryPrice,
  exitDate: json.exitDate,
  exitPrice: json.exitPrice,
  profit: json.exitPrice - json.entryPrice,
});

export const mapTradeList = mapList(mapTrade);
