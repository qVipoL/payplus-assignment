import { Link, useLogin } from "@refinedev/core";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Layout,
  Row,
  theme,
  Typography,
} from "antd";

export type LoginFormTypes = {
  idNumber: string;
  password: string;
};

export const LoginPage = () => {
  const { token } = theme.useToken();

  const [form] = Form.useForm<LoginFormTypes>();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({});

  return (
    <Layout>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: "16px",
          backgroundColor: "white",
        }}
      >
        <Col xs={22}>
          <Card
            title={<Typography.Title level={4}>Log In</Typography.Title>}
            style={{
              maxWidth: "400px",
              border: "1px solid #adadad84",
              margin: "auto",
              padding: "16px 0px",
              backgroundColor: token.colorBgElevated,
            }}
          >
            <Form<LoginFormTypes>
              layout="vertical"
              form={form}
              onFinish={(values) => login({ ...values })}
              requiredMark={false}
              initialValues={{
                remember: false,
              }}
            >
              <Form.Item
                name="idNumber"
                label="ID Card"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="ID Number"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                required
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  size="large"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  style={{
                    boxShadow: "none",
                  }}
                >
                  Log In To The System
                </Button>
              </Form.Item>
              <Flex justify="center">
                <Link
                  to="/register"
                  style={{
                    color: token.colorPrimaryTextHover,
                  }}
                >
                  Create New User
                </Link>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
