import { useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";
import { Button, Modal } from "antd";
import { CustomerDetailsForm } from "./customer-details-form";

export function CustomerCreate() {
  const { list } = useNavigation();
  const { formProps, modalProps, close } = useModalForm({
    action: "create",
    resource: "customer",
    defaultVisible: true,
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("customer", "replace");
      }}
      title="Customer"
      width={512}
      footer={
        <Button block type="primary" size="large" {...modalProps.okButtonProps}>
          Creating a Customer
        </Button>
      }
    >
      <CustomerDetailsForm formProps={formProps} />
    </Modal>
  );
}
