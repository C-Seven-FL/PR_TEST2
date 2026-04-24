import { FullScreenPage } from "../../../shared/components/layout/FullScreenPage";

import { ClientPage } from "./clientPage";
import { ProviderPage } from "./providerPage";

import { useAuth } from "../../../features/auth/context/AuthContext";


export function DashboardPage() {
  const { isAuthenticated, user, role, signOut } = useAuth();

  if (!isAuthenticated) return <div>Not authorized</div>;
  if (!role) return <div>Loading...</div>;

  let PageComponent;

  if (role === "client") {
    PageComponent = ClientPage;
  } else {
    PageComponent = ProviderPage;
  }

  return (
    <FullScreenPage>
      <PageComponent />
    </FullScreenPage>
  );
}
