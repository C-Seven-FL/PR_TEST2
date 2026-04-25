import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuMenu, LuPlus, LuUser, LuX } from "react-icons/lu";
import { useAuth } from "../../../features/auth/context/AuthContext";
import { UserProfileModal } from "../../../features/profile/components/UserProfileModal";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Services", to: "/services", roles: ["client"] },
  { label: "Calendar", to: "/calendar" },
];

const userLinks = [{ label: "Kalendář", to: "/calendar" }];

function NavButton({ item, isActive, mobile = false, onClick }) {
  return (
    <Button
      as={NavLink}
      to={item.to}
      size="sm"
      h={mobile ? "42px" : "36px"}
      justifyContent={mobile ? "flex-start" : "center"}
      w={mobile ? "100%" : "auto"}
      px="14px"
      borderRadius="8px"
      bg={isActive ? "#151f31" : "#111111"}
      color={isActive ? "#9eccf0" : "rgba(255,255,255,0.86)"}
      border="1px solid"
      borderColor={isActive ? "#1f4068" : "#1a1a1a"}
      _hover={{
        bg: isActive ? "#151f31" : "#171717",
      }}
      onClick={onClick}
    >
      {item.label}
    </Button>
  );
}

export function Navbar() {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { isAuthenticated, user, role, signOut } = useAuth();

  const userName = user?.profile?.name || user?.displayName || "Bookio User";
  const visibleNavItems = useMemo(
    () =>
      isAuthenticated
        ? navItems.filter((item) => !item.roles || item.roles.includes(role))
        : [],
    [isAuthenticated, role],
  );

  const closeAllMenus = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    closeAllMenus();
    signOut();
  };

  const handleOpenProfile = () => {
    closeAllMenus();
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="1000"
        bg="#0b0b0b"
        borderBottom="1px solid #171717"
        boxShadow="0 12px 30px rgba(0, 0, 0, 0.18)"
      >
        <Box
          px={{ base: "12px", sm: "16px", md: "24px", xl: "32px" }}
          py={{ base: "12px", md: "16px" }}
        >
          <Flex align="center" justify="space-between" gap="12px">
            <HStack gap="12px" minW="0" as={NavLink} to="/">
              <Box
                as="img"
                src="/BookioLogo.svg"
                alt="Bookio logo"
                display="block"
                h={{ base: "50px" }}
                w="auto"
                filter="invert(1)"
              />
              <Text
                color="white"
                fontSize={{ base: "20px", md: "26px" }}
                fontWeight="700"
                letterSpacing="-0.04em"
                lineClamp="1"
              >
                Bookio
              </Text>
            </HStack>

            <HStack gap="8px" display={{ base: "flex", lg: "none" }}>
              {isAuthenticated ? (
                <Button
                  as={NavLink}
                  to="/reservations"
                  size="sm"
                  h="38px"
                  px="12px"
                  borderRadius="8px"
                  bg="var(--brand-primary)"
                  color="white"
                  _hover={{ bg: "var(--brand-primary-hover)" }}
                >
                  <LuPlus />
                </Button>
              ) : null}
              <IconButton
                aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
                onClick={() => {
                  setIsMobileMenuOpen((current) => !current);
                  setIsUserMenuOpen(false);
                }}
                h="38px"
                minW="38px"
                borderRadius="8px"
                bg="#121212"
                color="white"
                border="1px solid #1e1e1e"
                _hover={{ bg: "#181818" }}
              >
                {isMobileMenuOpen ? <LuX /> : <LuMenu />}
              </IconButton>
            </HStack>

            <Flex
              align="center"
              justify="space-between"
              gap="16px"
              flex="1"
              display={{ base: "none", lg: "flex" }}
              ml="24px"
            >
              <Flex wrap="wrap" gap="8px" align="center" flex="1">
                {visibleNavItems.map((item) => (
                  <NavButton
                    key={item.to}
                    item={item}
                    isActive={location.pathname === item.to}
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                ))}
              </Flex>

              {isAuthenticated ? (
                <Flex align="center" gap="10px" position="relative">
                  {role === "client" ? (<Button
                    as={NavLink}
                    to="/services"
                    size="sm"
                    h="36px"
                    px="16px"
                    borderRadius="8px"
                    bg="var(--brand-primary)"
                    color="white"
                    _hover={{ bg: "var(--brand-primary-hover)" }}
                  >
                    Nová rezervace
                  </Button>) : null}

                  <Button
                    size="sm"
                    h="44px"
                    px="10px"
                    borderRadius="8px"
                    bg="#121212"
                    color="white"
                    border="1px solid #1e1e1e"
                    _hover={{ bg: "#181818" }}
                    onClick={() => setIsUserMenuOpen((current) => !current)}
                  >
                    <HStack gap="10px">
                      <Avatar.Root size="sm">
                        <Avatar.Fallback name={userName} />
                        <Avatar.Image src={user?.photoURL || "/userAvatar.svg"} />
                      </Avatar.Root>
                      <Stack gap="0" align="flex-start">
                        <Text fontSize="13px" fontWeight="700" lineHeight="1.2">
                          {userName}
                        </Text>
                        <Text
                          fontSize="11px"
                          color="rgba(255,255,255,0.62)"
                          lineHeight="1.2"
                        >
                          {role || user?.role || "user"}
                        </Text>
                      </Stack>
                    </HStack>
                  </Button>

                  {isUserMenuOpen ? (
                    <Box
                      position="absolute"
                      right="0"
                      top="52px"
                      minW="240px"
                      bg="#121212"
                      border="1px solid #222222"
                      borderRadius="10px"
                      boxShadow="0 18px 40px rgba(0, 0, 0, 0.28)"
                      p="8px"
                    >
                      <Stack gap="4px">
                        <Button
                          justifyContent="flex-start"
                          variant="ghost"
                          h="38px"
                          px="12px"
                          color="white"
                          _hover={{ bg: "#1b1b1b" }}
                          onClick={handleOpenProfile}
                        >
                          Profil uživatele
                        </Button>
                        {userLinks.map((item) => (
                          <Button
                            key={item.to}
                            as={NavLink}
                            to={item.to}
                            justifyContent="flex-start"
                            variant="ghost"
                            h="38px"
                            px="12px"
                            color="white"
                            _hover={{ bg: "#1b1b1b" }}
                            onClick={closeAllMenus}
                          >
                            {item.label}
                          </Button>
                        ))}
                        <Button
                          justifyContent="flex-start"
                          variant="ghost"
                          h="38px"
                          px="12px"
                          color="white"
                          _hover={{ bg: "#1b1b1b" }}
                          onClick={handleSignOut}
                        >
                          Odhlásit
                        </Button>
                      </Stack>
                    </Box>
                  ) : null}
                </Flex>
              ) : (
                <Button
                  as={NavLink}
                  to="/auth"
                  size="sm"
                  h="36px"
                  px="16px"
                  borderRadius="8px"
                  bg="var(--brand-primary)"
                  color="white"
                  _hover={{ bg: "var(--brand-primary-hover)" }}
                >
                  Přihlášení
                </Button>
              )}
            </Flex>
          </Flex>

          {isMobileMenuOpen ? (
            <Box
              mt="12px"
              display={{ base: "block", lg: "none" }}
              bg="#0f0f0f"
              border="1px solid #1a1a1a"
              borderRadius="12px"
              p="12px"
            >
              <Stack gap="10px">
                {isAuthenticated ? (
                  <>
                    <Box
                      bg="#121212"
                      border="1px solid #1e1e1e"
                      borderRadius="10px"
                      p="12px"
                    >
                      <HStack gap="10px" align="center">
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={userName} />
                          <Avatar.Image src={user?.photoURL || "/userAvatar.svg"} />
                        </Avatar.Root>
                        <Stack gap="0" align="flex-start">
                          <Text fontSize="14px" fontWeight="700" color="white">
                            {userName}
                          </Text>
                          <Text fontSize="12px" color="rgba(255,255,255,0.62)">
                            {user?.email || role || user?.role || "Authenticated"}
                          </Text>
                        </Stack>
                      </HStack>
                    </Box>

                    <Stack gap="8px">
                      {visibleNavItems.map((item) => (
                        <NavButton
                          key={item.to}
                          item={item}
                          mobile
                          isActive={location.pathname === item.to}
                          onClick={closeAllMenus}
                        />
                      ))}
                    </Stack>

                    <Button
                      as={NavLink}
                      to="/services"
                      h="42px"
                      borderRadius="8px"
                      bg="var(--brand-primary)"
                      color="white"
                      _hover={{ bg: "var(--brand-primary-hover)" }}
                      onClick={closeAllMenus}
                    >
                      Nová rezervace
                    </Button>

                    <Stack gap="8px">
                      <Button
                        justifyContent="flex-start"
                        h="42px"
                        borderRadius="8px"
                        bg="#121212"
                        color="white"
                        border="1px solid #1e1e1e"
                        _hover={{ bg: "#181818" }}
                        onClick={handleOpenProfile}
                      >
                        <LuUser />
                        <Box as="span" ml="8px">
                          Profil uživatele
                        </Box>
                      </Button>
                      {userLinks.map((item) => (
                        <Button
                          key={item.to}
                          as={NavLink}
                          to={item.to}
                          justifyContent="flex-start"
                          h="42px"
                          borderRadius="8px"
                          bg="#121212"
                          color="white"
                          border="1px solid #1e1e1e"
                          _hover={{ bg: "#181818" }}
                          onClick={closeAllMenus}
                        >
                          <LuUser />
                          <Box as="span" ml="8px">
                            {item.label}
                          </Box>
                        </Button>
                      ))}
                      <Button
                        justifyContent="flex-start"
                        h="42px"
                        borderRadius="8px"
                        bg="#121212"
                        color="white"
                        border="1px solid #1e1e1e"
                        _hover={{ bg: "#181818" }}
                        onClick={handleSignOut}
                      >
                        Odhlásit
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Button
                    as={NavLink}
                    to="/auth"
                    h="42px"
                    borderRadius="8px"
                    bg="var(--brand-primary)"
                    color="white"
                    _hover={{ bg: "var(--brand-primary-hover)" }}
                    onClick={closeAllMenus}
                  >
                    Přihlášení
                  </Button>
                )}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Box>

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}