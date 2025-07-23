import { useEffect } from "react";
import { validatedApi } from "./http-client/fetch+zod/runtime-wrapper";

function App() {
  useEffect(() => {
    const fetch = async () => {
      const res = await validatedApi.findPetsByTags({ tags: ["string"] });
      console.log(res);
    };
    fetch();
  }, []);

  return <div>react app</div>;
}

export default App;
