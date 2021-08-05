import logo from "./logo.svg";
import "./App.css";
import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Login } from "./components/Login";
import { Order } from "./components/Order";
import { useEffect, useState } from "react";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [usuario, setUsuario] = useState(false);
  const history = createBrowserHistory();
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user.length > 0) {
      setUsuario(true);
    }
  }, []);
  return (
    <Layout>
      <Router history={history}>
        <Header className="header">
          <Menu theme="dark" mode="horizontal">
            {usuario ? (
              <>
                <Menu.Item key="1">Cerrar sesion</Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <div>
                    <Avatar size="small" icon={<UserOutlined />} />
                  </div>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="1">
                  {" "}
                  <NavLink to="/login">Login</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <a>Crear Cuenta</a>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="usuarios">
                  <Menu.Item key="1">
                    <a>Administrador</a>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Ordenes">
                  <Menu.Item key="5">
                    <NavLink to="/order">Ordenes</NavLink>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/order">
                  <Order />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Kispy Kreme test front ©2021 Created by Jose Antonio Serrano
        </Footer>
      </Router>
    </Layout>
  );
}

export default App;
