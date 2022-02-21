import React, { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../dataBase/db";

export function User(email: string, password: string) {
  const user = useLiveQuery(
    async () => {
      const user = await db.users
        .where({ email: email, password: password })
        .first();

      return user;
    },
    [email, password]
  );

  return user;
}
