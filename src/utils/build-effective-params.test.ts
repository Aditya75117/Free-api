import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildEffectiveParams,
  getExplicitFieldsParam,
  upsertFieldsQueryParam,
} from "./build-effective-params";

describe("buildEffectiveParams", () => {
  it("preserves an explicit fields query param for AI keywords", () => {
    const params = [
      { key: "count", value: "10" },
      { key: "fields", value: "name,breed,age,weight,height" },
    ];

    const result = buildEffectiveParams(params, ["id", "name", "rating"], ["id", "name", "rating"]);

    assert.deepEqual(result, [
      { key: "count", value: "10" },
      { key: "fields", value: "name,breed,age,weight,height" },
    ]);
  });

  it("derives fields from the Response Fields UI when no explicit fields param exists", () => {
    const params = [{ key: "count", value: "5" }];
    const available = ["id", "firstName", "email"];
    const selected = ["id", "email"];

    const result = buildEffectiveParams(params, selected, available);

    assert.deepEqual(result, [
      { key: "count", value: "5" },
      { key: "fields", value: "id,email" },
    ]);
  });

  it("omits fields when all available fields are selected in the UI", () => {
    const params = [{ key: "count", value: "5" }];
    const available = ["id", "firstName", "email"];

    const result = buildEffectiveParams(params, available, available);

    assert.deepEqual(result, [{ key: "count", value: "5" }]);
  });
});

describe("upsertFieldsQueryParam", () => {
  it("adds a fields row when a subset is selected", () => {
    const params = [{ key: "count", value: "10" }];
    const available = ["id", "name", "email"];

    const result = upsertFieldsQueryParam(params, ["id", "name"], available);

    assert.deepEqual(result, [
      { key: "count", value: "10" },
      { key: "fields", value: "id,name" },
    ]);
  });

  it("removes the fields row when all fields are selected", () => {
    const params = [
      { key: "count", value: "10" },
      { key: "fields", value: "id,name" },
    ];
    const available = ["id", "name"];

    const result = upsertFieldsQueryParam(params, available, available);

    assert.deepEqual(result, [{ key: "count", value: "10" }]);
  });
});

describe("getExplicitFieldsParam", () => {
  it("returns the first non-empty fields param", () => {
    const params = [
      { key: "fields", value: "" },
      { key: "fields", value: "id,name" },
    ];

    assert.equal(getExplicitFieldsParam(params)?.value, "id,name");
  });
});
