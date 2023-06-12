import TextDate from '@/components/atoms/texts/TextDate';
import { TCategory, TConfig, TLaprasActivities, TTag } from '@/types';
import fetchCategories from '@/utils/fetchCategories';
import fetchTags from '@/utils/fetchTags';
import getSafeDate from '@/utils/getSafeDate';
import n2br from '@/utils/n2br';
import { Box, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import LayoutRoot from '@components/layouts/LayoutRoot';
import fetchConfig from '@utils/fetchConfig';
import { memo } from 'react';

type Props = {
  categories: TCategory[];
  tags: TTag[];
  config: TConfig;
  activities: TLaprasActivities;
};

export const About = ({ categories, tags, config, activities }: Props) => {
  const pr = n2br(config.profile.pr, true);

  return (
    <LayoutRoot categories={categories} tags={tags} config={config}>
      <div className="l-content--about">
        <Box textAlign="center" mb={8}>
          <Heading as="h2" size="lg" mb={8}>
            私について
          </Heading>
          <Text align="left">
            <div dangerouslySetInnerHTML={{ __html: pr }} />
          </Text>
        </Box>

        <Box textAlign="center" mb={8}>
          <Heading as="h2" size="lg" mb={8}>
            Activities
          </Heading>

          {activities.length ? (
            activities.map((activity) => (
              <LinkBox
                key={`${activity.date}_${activity.type}`}
                as="article"
                p="2"
                mb="3"
                borderWidth="1px"
                rounded="md"
                textAlign="left"
              >
                <Box as="time" dateTime={activity.date}>
                  <TextDate date={getSafeDate(activity.date)} />
                </Box>
                <Heading size="sm" as="h3" my="1">
                  <LinkOverlay
                    href={activity.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {activity.title}
                  </LinkOverlay>
                </Heading>
                <Text>
                  {activity.type === 'connpass'
                    ? 'connpass (イベント参加)'
                    : activity.type}
                </Text>
              </LinkBox>
            ))
          ) : (
            <div>取得できませんでした</div>
          )}
        </Box>
      </div>
    </LayoutRoot>
  );
};

export const getStaticProps = async () => {
  const config = await fetchConfig();
  const categories = await fetchCategories();
  const tags = await fetchTags();
  let activities = [];

  const syncActivity = async () => {
    let data;

    try {
      // @refs: https://github.com/lapras-inc/public-api-schema#response
      const url = `https://lapras.com/public/${config.profile.laprasAccountName}.json`;
      const res = await fetch(url);
      data = await res.json();
    } finally {
      activities = data?.activities || [];
    }
  };
  await syncActivity();

  return {
    props: {
      categories,
      tags,
      config,
      activities,
    },
  };
};

export default memo(About);
