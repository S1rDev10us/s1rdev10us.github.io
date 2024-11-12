{buildNpmPackage}:
buildNpmPackage {
  pname = "s1rdev10us.github.io";
  version = "0.0.0";
  src = ./.;
  buildPhase = ''
    npm run build
  '';
  installPhase = ''
    cp -r ./dist $out
  '';
}
