import { describe, expect, it } from "vitest";
import { getTopicsForPost, postHasTopic, TOPICS } from "./topics";
import { TOPIC_SLUGS } from "./topicSlugs";

const post = (topics?: string[]) =>
  ({ data: { topics } }) as unknown as Parameters<typeof postHasTopic>[0];

describe("topics", () => {
  it("mọi slug trong TOPIC_SLUGS đều có định nghĩa hub", () => {
    expect(Object.keys(TOPICS).sort()).toEqual([...TOPIC_SLUGS].sort());
  });

  it("postHasTopic đọc từ frontmatter topics", () => {
    expect(postHasTopic(post(["career"]), "career")).toBe(true);
    expect(postHasTopic(post(["career"]), "ai")).toBe(false);
    expect(postHasTopic(post(undefined), "ai")).toBe(false);
  });

  it("getTopicsForPost giữ thứ tự khai báo trong TOPICS và bỏ giá trị lạ", () => {
    expect(getTopicsForPost(["learning", "ai", "khong-co"])).toEqual([
      "ai",
      "learning",
    ]);
    expect(getTopicsForPost([])).toEqual([]);
    expect(getTopicsForPost(undefined)).toEqual([]);
  });
});
