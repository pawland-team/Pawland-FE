import { ReactQuillProps, UnprivilegedEditor } from 'react-quill';

type ReactQuillParamType = Parameters<NonNullable<ReactQuillProps['onChange']>>;

export type ValueOnChangeQuill = ReactQuillParamType[0];

export type DeltaOnChangeQuill = ReactQuillParamType[1];

export type SourceOnChangeQuill = ReactQuillParamType[2];

export type EditorOnChangeQuill = UnprivilegedEditor;
