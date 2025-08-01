/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
import {
  Mode,
  type FabricObjectSchema,
  type FabricSchema,
  type FormMeta,
} from '../typings';

/**
 * fabric schema 转 formValue
 */
export const schemaToFormValue = ({
  schema,
  activeObjectId,
  formMeta,
}: {
  schema: FabricSchema;
  activeObjectId: string;
  formMeta: FormMeta;
}): Partial<FabricObjectSchema> => {
  let s = schema.objects.find(o => o.customId === activeObjectId);

  // 图片是 Group 复合元素，要把需要的元素取出来
  if (s?.customType === Mode.IMAGE) {
    s = {
      ...s,
      ...s.objects?.[0],
      // 描边颜色和粗细从 borderRect 上取
      stroke: s.objects?.[1].stroke,
      strokeWidth: s.objects?.[1].strokeWidth,
    } as unknown as FabricObjectSchema;
  }
  const defaultFormValue: Partial<FabricObjectSchema> = {};
  formMeta?.content.forEach(item => {
    if (item.name) {
      defaultFormValue[item.name] =
        s?.[item.name] ?? item.setterProps?.defaultValue;
    }

    if ((item.tooltip?.content.length ?? 0) > 0) {
      item.tooltip?.content.forEach(d => {
        if (d.name) {
          defaultFormValue[d.name] = s?.[d.name] ?? d.setterProps?.defaultValue;
        }
      });
    }
  });
  return defaultFormValue;
};
