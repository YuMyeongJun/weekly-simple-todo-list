import { IcClose } from "@assets/icon";
import { Checkbox } from "@components/data-entry";
import { Col, Row } from "@components/layout";
import { dateUtils } from "@modules";
import { useTodoStore } from "@store";
import classNames from "classnames";
import { Children } from "react";

export const TodoListTodo = () => {
  const { todos, deleteTodo, completeTodo } = useTodoStore((state) => state);
  return (
    <>
      {Children.toArray(
        todos?.map((todo, index) => (
          <div className="bg-[var(--weekly-secondary-color-light)] p-2">
            <Row gutter={[8, 0]} align="center">
              <Col span={22}>
                <Checkbox
                  color="dark"
                  label={todo.title}
                  subLabel={dateUtils.convertDateToYYYYMMDDFormat(todo.date)}
                  slotProps={{
                    label: {
                      className: classNames(
                        { "line-through": todo?.complete },
                        {
                          "text-red-500":
                            dateUtils.todayOverDate(todo.date) &&
                            !todo?.complete,
                        },
                      ),
                    },
                    subLabel: {
                      className: classNames({
                        "text-red-500": dateUtils.todayOverDate(todo.date),
                      }),
                    },
                  }}
                  defaultChecked={todo?.complete}
                  onChange={() => completeTodo(index)}
                />
              </Col>
              <Col span={2}>
                <IcClose
                  width={10}
                  height={10}
                  className="cursor-pointer"
                  onClick={() => deleteTodo(index)}
                />
              </Col>
            </Row>
          </div>
        )),
      )}
    </>
  );
};