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
 
import { type Dataset, StorageLocation } from '@coze-arch/idl/knowledge';

export function getStorageStrategyEnabled(dataset?: Dataset) {
  return (
    // 云搜索只在国内环境上线
    IS_CN_REGION &&
    // 只有知识库首次上传，才可以配置云搜索
    dataset?.doc_count === 0 &&
    dataset?.storage_location === StorageLocation.Default
  );
}
