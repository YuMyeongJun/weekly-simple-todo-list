import { PageLayout, PageSection, PageMeta } from "@components/layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import classNames from "classnames";
import { ITodoCreateVO } from "@models";
import { useTodoStore } from "@store";
import { useNavigate, useParams } from "react-router";
import { Button, Input, Textarea } from "@components/data-entry";

export const TodoCreateComponent = () => {
  const { todoIndex } = useParams();
  const _todoIndex = Number(todoIndex);
  const navigate = useNavigate();
  const { todos, addTodo, modiTodo } = useTodoStore((state) => state);
  const schema = yup.object({
    title: yup.string().required("제목을 입력해주세요."),
    content: yup.string().required("내용을 입력해주세요."),
  });
  const defaultValue = todoIndex ? todos?.[_todoIndex] : undefined;
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodoCreateVO>({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: ITodoCreateVO) => {
    if (todoIndex && todoIndex !== "") {
      modiTodo(data, _todoIndex);
    } else {
      addTodo(data);
    }

    navigate("/");
  };
  return (
    <PageLayout>
      <PageMeta title="To-Do" />
      <form
        role="todo-create-form"
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <PageSection title="제목">
          <Input
            role="todo-create-title"
            type="text"
            className={classNames("weekly-input w-full", {
              invalid: errors.title,
            })}
            placeholder="텍스트 입력"
            {...register("title")}
          />
          {errors.title?.message && (
            <span className="text-[var(--weekly-error-color-main)]">
              {errors.title?.message}
            </span>
          )}
        </PageSection>
        <PageSection title="내용">
          <Textarea
            role="todo-create-content"
            className={classNames("weekly-textarea w-full", {
              invalid: errors.content,
            })}
            placeholder="텍스트 입력"
            rows={5}
            {...register("content")}
          />
          {errors.content?.message && (
            <span className="text-[var(--weekly-error-color-main)]">
              {errors.content?.message}
            </span>
          )}
        </PageSection>
        <PageSection title="Due Date (Option)">
          <Input
            role="todo-create-date"
            type="date"
            className={classNames("weekly-input", {
              "before:absolute before:content-[attr(data-placeholder)] before:w-full before:h-full before:leading-loose before:text-[#9da3ae] before:text-sm before:top-1/2 before:translate-y-[-50%]":
                !watch("date"),
            })}
            data-placeholder-view={!!watch("date")}
            data-placeholder="날짜 입력"
            {...register("date")}
          />
        </PageSection>
        <Button role="todo-create-submit" type="submit" className="weekly-btn">
          저장 버튼
        </Button>
      </form>
    </PageLayout>
  );
};
