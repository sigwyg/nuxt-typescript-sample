<template>
  <div class="st-wrapper">
    <header class="st-header">
      <a href="/" class="st-logo">Nuxt x TypeScript</a>
    </header>
    <main role="main">
      <nuxt />
    </main>
    <footer class="st-footer">
      <address><a href="https://github.com/sigwyg">@sigwyg</a></address>
    </footer>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/main.scss';

.st-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
}

main[role='main'] {
  padding: 0 1em 2em;
  flex-grow: 1;
  background: $--color-white;
}

.st-header {
  padding: 1em;
  border-bottom: 1px solid $--color-lightgray;
  text-align: center;
  background: $--color-white;
}

.st-logo {
  font-size: 24px;

  &:link {
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
}

.st-footer {
  background: $--color-black;
  padding: 1em;
  text-align: center;
}
</style>
