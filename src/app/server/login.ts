"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
// import LdapClient from "ldapjs-client";
interface LdapEntry {
  dn: string;
  employeeID?: string;
  uris?: string[];
}
export async function authenticateUser(email: string, password: string) {
  try {
    if (process.env.MY_ENV === "development") {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
          name: true,
        },
      });

      if (!user) throw new Error("User not found");

      if (!user.password) throw new Error("User password is null");
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error("Invalid password");

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      };

      //production
    } else {
      // const username = email.split("@")[0] + "@ethio.local";
      // console.log("username..........................", username);
      // const client = new LdapClient({
      //   url: process.env.LDAP!,
      // });

      // await client.bind(username, password);
      // const options = {
      //   filter: `(sAMAccountName=${username.split("@")[0]})`,
      //   scope: "sub",
      //   attributes: ["employeeid"],
      // };

      // const entries: LdapEntry[] = (await client.search(
      //   "DC=ethio,DC=local",
      //   options
      // )) as LdapEntry[];

      const entries: LdapEntry[] = [
        {
          dn: "CN=Seyid Takele,OU=IT Service Design,OU=Information System,DC=ethio,DC=local",
          employeeID: "17453",
        },
        {
          dn: "",
          uris: [
            "ldap://DomainDnsZones.ethio.local/DC=DomainDnsZones,DC=ethio,DC=local",
          ],
        },
        {
          dn: "",
          uris: [
            "ldap://ForestDnsZones.ethio.local/DC=ForestDnsZones,DC=ethio,DC=local",
          ],
        },
        {
          dn: "",
          uris: ["ldap://ethio.local/CN=Configuration,DC=ethio,DC=local"],
        },
      ];
      console.log("entyees..........................", entries);
      const { employeeID } = entries.find((entry) => entry.dn != "") || {};

      if (employeeID) {
        console.log("employee id......................", employeeID);
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            role: true,
            name: true,
          },
        });
        if (!user) throw new Error("User not found in db");
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      } else {
        throw new Error("User not foundxxx");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
}
