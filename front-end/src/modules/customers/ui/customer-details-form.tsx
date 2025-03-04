import { DatePicker, Form, FormProps, Input } from "antd";

export function CustomerDetailsForm({ formProps }: { formProps: FormProps }) {
  return (
    <Form {...formProps} layout="vertical">
      <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
        <Input size="large" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input size="large" />
      </Form.Item>
      <Form.Item name="phoneNumber" label="Phone" rules={[{ required: true }]}>
        <Input size="large" />
      </Form.Item>
      <Form.Item name="birthday" label="Birthday" rules={[{ required: true }]}>
        <DatePicker
          format="DD/MM/YYYY"
          style={{ width: "100%" }}
          size="large"
        />
      </Form.Item>
    </Form>
  );
}
