<script lang="ts">
  import type { TopAppBarComponentDev } from '@smui/top-app-bar';
  import TopAppBar, {
    Row,
    Section,
    Title,
    AutoAdjust,
  } from '@smui/top-app-bar';
  import IconButton, { Icon } from '@smui/icon-button';
  import { mdiMenu, mdiBarcode, mdiHomeCircle } from '@mdi/js';
  import { Svg } from '@smui/common/elements';
  import Drawer, {
    AppContent,
    Content,
    Header,
    Subtitle,
    Scrim,
  } from '@smui/drawer';
  import Button, { Label } from '@smui/button';
  import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
  import { H6 } from '@smui/common/elements';
  let open = false;
  let active = 'Inbox';

  function setActive(value: string) {
    active = value;
    open = false;
  }

  let topAppBar: TopAppBarComponentDev;
</script>

<TopAppBar bind:this={topAppBar} variant="standard">
  <Row>
    <Section>
      <IconButton on:click={() => (open = !open)}>
        <Icon component={Svg} viewBox="0 0 24 24">
          <path fill="currentColor" d={mdiMenu} />
        </Icon>
      </IconButton>
      <Title>Standard</Title>
    </Section>
    <Section align="end" toolbar>
      <IconButton>
        <Icon component={Svg} viewBox="0 0 24 24">
          <path fill="currentColor" d={mdiBarcode} />
        </Icon>
      </IconButton>
      <IconButton>
        <Icon component={Svg} viewBox="0 0 24 24">
          <path fill="currentColor" d={mdiHomeCircle} />
        </Icon>
      </IconButton>
    </Section>
  </Row>
</TopAppBar>
<AutoAdjust {topAppBar} />
<div class="drawer-container">
  <!-- Don't include fixed={false} if this is a page wide drawer.
          It adds a style for absolute positioning. -->
  <Drawer variant="modal" bind:open>
    <Header>
      <Title>Super Mail</Title>
      <Subtitle>It's the best fake mail app drawer.</Subtitle>
    </Header>
    <Content>
      <List>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Inbox')}
          activated={active === 'Inbox'}
        >
          <Graphic class="material-icons" aria-hidden="true">inbox</Graphic>
          <Text>Inbox</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Star')}
          activated={active === 'Star'}
        >
          <Graphic class="material-icons" aria-hidden="true">star</Graphic>
          <Text>Star</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Sent Mail')}
          activated={active === 'Sent Mail'}
        >
          <Graphic class="material-icons" aria-hidden="true">send</Graphic>
          <Text>Sent Mail</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          on:click={() => setActive('Drafts')}
          activated={active === 'Drafts'}
        >
          <Graphic class="material-icons" aria-hidden="true">drafts</Graphic>
          <Text>Drafts</Text>
        </Item>

        <Separator />
        <Subheader component={H6}>Labels</Subheader>
        <Item
          href="javascript:void(0)"
          activated={active === 'Family'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Family</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          activated={active === 'Friends'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Friends</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          activated={active === 'Work'}
        >
          <Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
          <Text>Work</Text>
        </Item>
      </List>
    </Content>
  </Drawer>
</div>
