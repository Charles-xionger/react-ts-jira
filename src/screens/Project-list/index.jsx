import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject } from "../../utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])

  const [list,setList] = useState([])
  const debouncedParam = useDebounce(param, 5000)
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List list={list} users={users}/>
  </div>
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  },[])
}

export const useDebounce = (value, delay) => {
  // 值是响应式的
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在 value 变化后， 设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
