import React, { MutableRefObject } from "react";
import { Button, Form, Input, Grid } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";

type Props = {
  formRef: MutableRefObject<any>;
  initialValues: number[];
  onSubmitHandler: (values: any) => void;
  placeHolder: string;
};

export default function FormComponent({
  initialValues,
  onSubmitHandler,
  formRef,
  placeHolder,
}: Props) {
  return (
    <Form
      ref={formRef}
      autoComplete="off"
      initialValues={{ numbers: initialValues }}
      onSubmit={onSubmitHandler}
    >
      <Form.List field="numbers">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((item, index) => {
                return (
                  <Grid.Row key={item.key}>
                    <Form.Item
                      field={item.field}
                      label={placeHolder + (index + 1)}
                      style={{
                        width: 600,
                      }}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Button
                      icon={<IconDelete />}
                      shape="circle"
                      status="danger"
                      style={{
                        margin: "0 20px",
                      }}
                      onClick={() => remove(index)}
                    ></Button>
                  </Grid.Row>
                );
              })}
              <Button
                onClick={() => {
                  add();
                }}
              >
                Yeni {placeHolder}
              </Button>
            </div>
          );
        }}
      </Form.List>
      <Form.Item style={{ marginTop: 20 }}>
        <Button long type="primary" htmlType="submit">
          Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
}
