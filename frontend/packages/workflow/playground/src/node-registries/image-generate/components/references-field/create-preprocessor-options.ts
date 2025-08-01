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
 
import { I18n, type I18nKeysNoOptionsType } from '@coze-arch/i18n';

import thumbnail7 from '../../assets/reference-7.png';
import thumbnail6 from '../../assets/reference-6.jpg';
import thumbnail5 from '../../assets/reference-5.jpg';
import thumbnail4 from '../../assets/reference-4.jpg';
import thumbnail3 from '../../assets/reference-3.jpg';
import thumbnail2 from '../../assets/reference-2.jpg';
import thumbnail1 from '../../assets/reference-1.jpg';

const thumbnails = [
  thumbnail1,
  thumbnail2,
  thumbnail3,
  thumbnail4,
  thumbnail5,
  thumbnail6,
  thumbnail7,
];

export function createPreprocessorOptions({
  currentPreprocessor,
  allSelectedPreprocessor = [],
}: {
  currentPreprocessor?: number;
  allSelectedPreprocessor: number[];
}) {
  const options = [1, 2, 3, 4, 5, 7, 6].map(index => ({
    label: I18n.t(`Imageflow_reference${index}` as I18nKeysNoOptionsType),
    value: index,
    tooltip: I18n.t(
      `imageflow_reference_desc${index}` as I18nKeysNoOptionsType,
    ),
    thumbnail: thumbnails[index - 1],
    disabled: isPreprocessorDisabled({
      currentItemPreprocessor: currentPreprocessor,
      currentOptionPreprocessor: index,
      allSelectedPreprocessor,
    }),
  }));

  return options;
}

function isPreprocessorDisabled({
  currentItemPreprocessor,
  currentOptionPreprocessor,
  allSelectedPreprocessor,
}: {
  currentItemPreprocessor?: number;
  currentOptionPreprocessor: number;
  allSelectedPreprocessor: number[];
}) {
  let disabled = false;

  // 如果当前选项的预处理器已经被当前项选中 从allSelectedPreprocessor中移除
  allSelectedPreprocessor = allSelectedPreprocessor.filter(
    item =>
      !(
        item === currentItemPreprocessor &&
        currentItemPreprocessor === currentOptionPreprocessor
      ),
  );

  // 不能添加相同的模型
  if (allSelectedPreprocessor.includes(currentOptionPreprocessor)) {
    disabled = true;
  }

  // 1到4编号最多只能出现两个 4以上编号的模型不做限制
  const group = [1, 2, 3, 4];
  if (group.includes(currentOptionPreprocessor)) {
    const isPreprocessorGroup =
      allSelectedPreprocessor.filter(item => group.includes(item)).length === 2;

    if (isPreprocessorGroup) {
      disabled = true;
    }
  }

  return disabled;
}
