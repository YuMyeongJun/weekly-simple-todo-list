import { PageLayout, PageSection } from "@components/layout";
import PageMeta from "@components/layout/page/PageMeta";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import classNames from "classnames";
import { ICreateTodoVO } from "@models";
import { useTodoStore } from "@store";
import { useNavigate } from "react-router";

export const TodoCreateComponent = () => {
  const navigate = useNavigate()
  const { addTodo } = useTodoStore((state) => state);
  const schema = yup.object({
    title: yup.string().required("제목을 입력해주세요."),
    content: yup.string().required("내용을 입력해주세요."),
  });
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTodoVO>({
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: ICreateTodoVO) => {
    console.log(data);
    addTodo(data);
    navigate('/')
  };
  return (
    <PageLayout>
      <PageMeta title="To-Do" />
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <PageSection title="제목">
          <input
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
          <textarea
            className={classNames("weekly-textarea w-full", {
              invalid: errors.content,
            })}
            placeholder="텍스트 입력"
            rows={5}
            {...register("content")}
          ></textarea>
          {errors.content?.message && (
            <span className="text-[var(--weekly-error-color-main)]">
              {errors.content?.message}
            </span>
          )}
        </PageSection>
        <PageSection title="Due Date (Option)">
          <input
            type="date"
            className="weekly-input w-full"
            data-placeholder="날짜 입력"
            {...register("date")}
          />
        </PageSection>
        <button type="submit" className="weekly-btn">
          저장 버튼
        </button>
      </form>
    </PageLayout>
  );
};
