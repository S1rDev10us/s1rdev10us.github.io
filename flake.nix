{
  description = "S1rDev10us' website";
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-24.05";
  };
  outputs = {
    self,
    nixpkgs,
  }: let
    pkgs = nixpkgs;
    lib = nixpkgs.lib;
    x86_64-linux_pkgs = pkgs.legacyPackages.x86_64-linux;
  in {
    devShells = let
      allSystems = ["x86_64-linux"];
      forAllSystems = f: lib.genAttrs allSystems (system: f {systemPkgs = pkgs.legacyPackages.${system};});
    in
      forAllSystems ({systemPkgs}: {
        default = systemPkgs.mkShell {
          packages = with systemPkgs; [
            just
            alejandra
            nodejs_22
          ];
        };
      });
    packages.x86_64-linux.default = x86_64-linux_pkgs.callPackage ./default.nix {};
  };
}
