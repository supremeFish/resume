/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React from 'react';
import { Link, useIntl, connect, Dispatch } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Super Fish`}
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/supremeFish/resume',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children, settings } = props;
  /**
   * constructor
   */

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      menuRender={() => null}
      collapsedButtonRender={() => {
        return (
          <>
            <Avatar shape="square" src={logo} />
            <Link to="/">
              <Typography.Title level={4} style={{ display: 'inline', marginLeft: 10 }}>
                i-resume
              </Typography.Title>
            </Link>
          </>
        );
      }}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => defaultFooterDom}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
