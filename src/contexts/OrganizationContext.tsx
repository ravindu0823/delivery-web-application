import { createContext, useContext, useEffect, useState } from "react";
import {
  Organization,
  OrganizationContextProviderProps,
  OrganizationContextType,
} from "../utils/Props";
import { useParams } from "react-router-dom";
import { getOrganization } from "../api/organizationController";
import { AuthContext } from "./AuthContext";

export const OrganizationContext =
  createContext<OrganizationContextType | null>(null);

export const OrganizationContextProvider = ({
  children,
}: OrganizationContextProviderProps) => {
  const params = useParams();
  const ORGANIZATION: string = params.orgId!;

  const authContext = useContext(AuthContext);
  const { user } = authContext!;

  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organization = await getOrganization(
          ORGANIZATION,
          user!.accessToken!
        );
        setOrganization(organization);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchOrganization();
  }, [ORGANIZATION, user]);

  console.log(organization);

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        setOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
