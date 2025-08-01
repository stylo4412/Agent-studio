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
 
import { ModelParamType } from '@coze-arch/bot-api/developer_api';

import { primitiveExhaustiveCheck } from '../exhaustive-check';

export interface ConvertedModelValueTypeMap {
  [ModelParamType.Boolean]: boolean;
  [ModelParamType.Float]: number;
  [ModelParamType.Int]: number;
  [ModelParamType.String]: string;
}

export function convertModelValueType(
  value: string,
  type: ModelParamType,
): ConvertedModelValueTypeMap[ModelParamType] {
  if (type === ModelParamType.Boolean) {
    return value === 'true';
  }

  if (type === ModelParamType.String) {
    return value;
  }

  if (type === ModelParamType.Float || type === ModelParamType.Int) {
    return Number(value);
  }

  // 理论上不走这里
  primitiveExhaustiveCheck(type);
  return value;
}
