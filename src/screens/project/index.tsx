import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import EpicScreen from "./components/espic";
import KanbanScreen from "./components/kanban";

export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route
          path="/"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
};
