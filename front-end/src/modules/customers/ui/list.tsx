import { List, useTable } from "@refinedev/antd";
import { Flex, Grid, Table, Typography } from "antd";
import dayjs from "dayjs";
import { Customer } from "../model/types";
import { PropsWithChildren, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";

export function CustomerList({ children }: PropsWithChildren) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const { tableProps } = useTable<Customer>({
    resource: "customer",
    pagination: {
      mode: "off",
    },
  });

  const { xs } = Grid.useBreakpoint();

  return (
    <>
      <List title="List of Customers" breadcrumb={false}>
        <Flex
          vertical={xs}
          gap={16}
          style={{
            height: xs ? undefined : "calc(100vh - 200px)",
          }}
        >
          <Flex
            style={{
              flex: 1,
              borderRight: xs ? "none" : "1px solid #ababab",
              paddingRight: xs ? 0 : 16,
            }}
          >
            <Table<Customer>
              {...tableProps}
              style={{ width: "100%" }}
              onRow={(row) => {
                return {
                  onClick() {
                    setSelectedCustomer(row);
                  },
                  style: {
                    cursor: "pointer",
                  },
                };
              }}
            >
              <Table.Column dataIndex="fullName" title="Name" />
              <Table.Column dataIndex="email" title="Email" />
              <Table.Column dataIndex="phoneNumber" title="Phone" />
              <Table.Column
                dataIndex="birthday"
                title="Birthday"
                render={(v) => dayjs(v).format("DD/MM/YYYY")}
              />
              <Table.Column<Customer>
                render={(_, r) =>
                  r.id === selectedCustomer?.id ? (
                    <RightOutlined />
                  ) : (
                    <DownOutlined />
                  )
                }
              />
            </Table>
          </Flex>
          <Flex style={{ flex: xs ? undefined : 1 }}>
            {selectedCustomer ? (
              <Flex vertical gap={8}>
                <Flex gap={8}>
                  <Typography.Text>Name:</Typography.Text>
                  <Typography.Text style={{ fontWeight: "bold" }}>
                    {selectedCustomer.fullName}
                  </Typography.Text>
                </Flex>
                <Flex gap={8}>
                  <Typography.Text>Phone:</Typography.Text>
                  <Typography.Text style={{ fontWeight: "bold" }}>
                    {selectedCustomer.phoneNumber}
                  </Typography.Text>
                </Flex>
                <Flex gap={8}>
                  <Typography.Text>Email:</Typography.Text>
                  <Typography.Text style={{ fontWeight: "bold" }}>
                    {selectedCustomer.email}
                  </Typography.Text>
                </Flex>
                <Flex gap={8}>
                  <Typography.Text>Birthday:</Typography.Text>
                  <Typography.Text style={{ fontWeight: "bold" }}>
                    {dayjs(selectedCustomer.birthday).format("DD/MM/YYYY")}
                  </Typography.Text>
                </Flex>
              </Flex>
            ) : (
              " "
            )}
          </Flex>
        </Flex>
      </List>
      {children}
    </>
  );
}
