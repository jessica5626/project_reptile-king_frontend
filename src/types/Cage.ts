export interface Cage {
  id: number;
  name: string;
  serial_code: string;
  user_id: number;
  reptile_serial_code: string | null;
  memo: string;
  set_temp: number;
  set_hum: number;
  img_urls: string[];
  created_at: string;
  updated_at: string;
  expired_at: string | null;
}

export interface CurCage {
  id: number;
  cur_temp: number | null;
  cur_hum: number | null;
  name: string;
  serial_code: string;
  user_id: number;
  reptile_serial_code: string | null;
  memo: string;
  set_temp: number;
  set_hum: number;
  img_urls: string[];
  created_at: string;
  updated_at: string;
  expired_at: string | null;
}

export interface Reptile {
  id: number;
  name: string;
  serial_code:string;
  user_id: number;
  species: string;
  gender: string;
  birth: string;
  memo: string;
  img_urls: string[];
  created_at: string;
  updated_at: string;
  expired_at: string | null;
}

export interface AvgTempHum {
  date: string;
  hour: string;
  avgtemp: string;
  avghum: string;
}
