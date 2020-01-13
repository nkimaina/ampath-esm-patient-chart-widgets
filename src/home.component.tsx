import React from "react";
import { match, Route } from "react-router";
import { maybe } from "kremling";

export default function Home(props: HomeProps) {
  return (
    <main className="omrs-main-content">
      <div>Home Component</div>
    </main>
  );
}

type HomeProps = {
  match: match;
  location: any;
};
