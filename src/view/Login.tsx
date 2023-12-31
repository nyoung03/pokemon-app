import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { isLoginAtom, userIdAtom } from "../recoil/recoil";
import { useSetRecoilState } from "recoil";

interface IProps {
  password: string;
  remember: boolean;
  id: string;
}

function Login() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setUserId = useSetRecoilState(userIdAtom);

  const onFinish = (values: IProps) => {
    if (values.remember) {
      localStorage.setItem("id", values.id);
    }
    setIsLogin(true);
    setUserId(values.id);
    navigate("/");
  };

  return (
    <div id="login">
      <div className="box">
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="id"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Id"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="#">
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
