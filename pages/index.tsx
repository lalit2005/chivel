import type { NextPage } from "next";
import { Button } from "@mantine/core";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Button variant="outline" color="red">
        Hello World
      </Button>
      <Button variant="outline">Hello</Button>
      <h1 className="text-green-400 ">Hello world</h1>
    </div>
  );
};

export default Home;
