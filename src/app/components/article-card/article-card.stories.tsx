import type { Meta, StoryObj } from "@storybook/react-vite";

import ArticleCard from "./article-card";

const meta = {
  title: "Molecules/Article Card",
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sunset Beach, North Carolina",
    extract:
      "Sunset Beach is a seaside town in Brunswick County, North Carolina, United States. The population was 3,572 at the 2010 census, up from 1,824 in 2000 census. It is part of the Wilmington, NC Metropolitan Statistical Area and the southernmost beach in the state.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SeagullOverWave.jpg/960px-SeagullOverWave.jpg",
  },
};

export const Overflowing: Story = {
  args: {
    title: "Sunset Beach, North Carolina",
    extract:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed scelerisque viverra ligula, id faucibus tellus vestibulum eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus sit amet metus erat. Fusce euismod pellentesque varius. Praesent vulputate nibh et elit pulvinar, vitae euismod erat dapibus. Suspendisse tincidunt turpis sapien, a fermentum mauris tempor et. Fusce viverra sem nec sem gravida euismod. Nam nec ligula vitae lectus lobortis viverra. Quisque rhoncus fringilla mauris id efficitur. Mauris in maximus sapien, et interdum mauris.\n\nDonec interdum sagittis mauris nec sodales. Duis ultrices, enim non pulvinar auctor, risus enim molestie felis, vitae lobortis felis tellus sit amet lacus. Integer facilisis tortor sit amet ipsum commodo, eu ornare mauris condimentum. Aliquam consectetur lectus id lorem bibendum, ut consequat mi bibendum. Quisque accumsan urna nec ipsum vehicula, nec mollis magna dignissim. Fusce quis porta tortor, mollis ornare magna. Cras ultricies nisl id ante eleifend ultricies. Phasellus ultricies aliquet purus, sit amet interdum mi sodales at. Morbi aliquet sollicitudin pharetra. Aliquam mi risus, aliquet facilisis hendrerit at, mattis sed ligula. Nullam eget varius enim.\n\nIn viverra quis lacus scelerisque scelerisque. Nam erat lorem, convallis sit amet nibh sit amet, pharetra pulvinar augue. Nulla in leo tristique, vestibulum purus vel, porta ex. Maecenas egestas maximus mauris sed porta. Nulla pellentesque ultrices quam, nec maximus neque laoreet non. Sed ac dui vulputate, iaculis nisi vitae, suscipit tellus. Nullam semper fermentum felis ac elementum.\n\nMauris et diam nec lorem suscipit mattis eu et erat. Nam accumsan turpis in nibh dignissim, nec volutpat diam ullamcorper. Aenean eget enim efficitur, aliquet eros sit amet, facilisis turpis. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent commodo elit sit amet faucibus blandit. In sit amet purus eget ligula ullamcorper elementum nec vitae urna. Nulla at pretium tortor. Curabitur vel turpis at nisi elementum convallis quis ut dolor. Vestibulum maximus blandit pretium. Quisque eget mi dui.\n\nMaecenas eu eros est. Proin quis diam egestas nisl porttitor volutpat. Morbi feugiat urna quis odio ultricies rhoncus. Praesent nec ornare lacus. Vivamus viverra metus quis nunc scelerisque mattis. Suspendisse id nibh bibendum, malesuada sem non, finibus diam. Suspendisse semper pharetra neque at commodo. Donec vel lacus sit amet dolor pretium imperdiet. Donec non leo eu nisi lacinia dictum. Etiam bibendum fringilla vehicula. Cras blandit mattis hendrerit. Proin nec vehicula elit. Morbi ut nibh eu arcu varius suscipit. Fusce tincidunt mauris vitae metus maximus volutpat. Aliquam sed augue quis diam pretium mattis vel quis velit. ",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SeagullOverWave.jpg/960px-SeagullOverWave.jpg",
  },
};
