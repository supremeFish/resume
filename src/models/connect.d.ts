import { MenuDataItem } from '@ant-design/pro-layout';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';

export { SettingModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  settings: SettingModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
