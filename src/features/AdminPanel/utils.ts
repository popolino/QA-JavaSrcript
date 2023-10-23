import { useAppSelector } from "../../app/hooks";

export const init = {
  plugins:
    "anchor autocorrect charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount autoresize",
  toolbar:
    "undo redo |  styles | bold italic|underline | strikethrough | link image table | align| numlist bullist indent outdent| charmap|removeformat ",
};

export const apiKey = "3lbge1yolebi9j427p1wy9vlarmd54jg8jem9xvsb5wcdcdo";

export const handleChange = (label: number, set: (label: number) => void) => {
  set(label);
};

export const selectOptions = (
  options: any[],
  value: "id" | "title"
): { value: string; label: string }[] => {
  if (value === "id")
    return Array.isArray(options)
      ? options.map((option) => ({
          value: option.id,
          label: option.name,
        }))
      : [];
  else
    return Array.isArray(options)
      ? options.map((option) => ({
          value: option.title,
          label: option.name,
        }))
      : [];
};

// export const categoriesOptions = Array.isArray(categories)
//   ? categories.map((category) => ({
//       value: category.id,
//       label: category.name,
//     }))
//   : [];
