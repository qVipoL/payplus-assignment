import { List, useTable } from "@refinedev/antd";
import { Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import { Customer } from "../model/types";
import { useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";

export function CustomerList() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const { tableProps } = useTable<Customer>({
    resource: "customer",
    pagination: {
      mode: "off",
    },
  });

  return (
    <List title="List of Customers">
      <Flex gap={16} style={{ height: "calc(100vh - 200px)" }}>
        <Flex
          style={{
            flex: 1,
            borderRight: "1px solid #ababab",
            paddingRight: 16,
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
        <Flex style={{ flex: 1 }}>
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
  );
}
