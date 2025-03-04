import { DatePicker, Form, FormProps, Input } from "antd";

export function CustomerDetailsForm({ formProps }: { formProps: FormProps }) {
  return (
    <Form {...formProps} layout="vertical">
      <Form.Item
        name="fullName"
        label="Full Name"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone"
        required
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        required
        rules={[{ required: true }]}
      >
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>
    </Form>
  );
}
