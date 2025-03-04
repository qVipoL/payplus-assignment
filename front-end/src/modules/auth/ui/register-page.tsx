import { Link, useRegister } from "@refinedev/core";
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

export type RegisterFormTypes = {
  idNumber: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterPage = () => {
  const { token } = theme.useToken();

  const [form] = Form.useForm<RegisterFormTypes>();
  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>({});

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
            title={
              <Typography.Title level={4}>Creating A New User</Typography.Title>
            }
            style={{
              maxWidth: "400px",
              border: "1px solid #adadad84",
              margin: "auto",
              padding: "16px 0px",
              backgroundColor: token.colorBgElevated,
            }}
          >
            <Form<RegisterFormTypes>
              layout="vertical"
              form={form}
              onFinish={(values) => register({ ...values })}
              requiredMark={false}
              initialValues={{
                remember: false,
              }}
            >
              <Form.Item
                name="idNumber"
                label="Identity Number"
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
                name="fullName"
                label="Full Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Full Name"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="email"
                  placeholder="Email"
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
                  {
                    min: 6,
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
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                required
                rules={[
                  {
                    required: true,
                  },
                  {
                    min: 6,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The passwords should match")
                      );
                    },
                  }),
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
                  Create A User
                </Button>
              </Form.Item>
              <Flex justify="center">
                <Link
                  to="/login"
                  style={{
                    color: token.colorPrimaryTextHover,
                  }}
                >
                  Log In With Existing User
                </Link>
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
