import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols"
import type {
  ElementType,
  Key,
  Props,
  ReactElementType,
  Ref,
  Type,
} from "shared/ReactTypes"

// ReactElement
const ReactElement = function (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props,
): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: "ayingott",
  }

  return element
}

export const jsx = (
  type: ElementType,
  config: any,
  ...maybeChildren: any[]
) => {
  let key: Key = null
  const props: Props = {}
  let ref: Ref = null

  for (const prop in config) {
    const val = config[prop]

    if (prop === "key") {
      if (val !== undefined) {
        key = `${val}`
      }
      continue
    }

    if (prop === "ref") {
      if (val !== undefined) {
        ref = val
      }
      continue
    }

    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val
    }
  }

  const maybeChildrenLength = maybeChildren.length
  if (maybeChildrenLength > 0) {
    // [child], [child, child, child]
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0]
    } else {
      props.children = maybeChildren
    }
  }

  return ReactElement(type, key, ref, props)
}

export const jsxDEV = jsx
