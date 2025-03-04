import { Create, useForm } from "@refinedev/antd";
import { CustomerDetailsForm } from "./customer-details-form";

export function CustomerCreate() {
  const { formProps, saveButtonProps } = useForm({
    resource: "customer",
    redirect: "list",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <CustomerDetailsForm formProps={formProps} />
    </Create>
  );
}
