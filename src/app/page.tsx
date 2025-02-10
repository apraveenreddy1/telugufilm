import { getMetadata } from '@/core/seo/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import {
  FeaturedListSection,
  FeaturedListSectionSkeleton,
} from '@/features/home/components/featured-list-section';
import { MediaType } from '@/features/media/utils';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import {
  getPopularMovies,
  getSliderMovies,
} from '@/features/movies/data';
import { getPopularPeople } from '@/features/people/data';
import { Divider, Stack } from '@mui/material';
import { Suspense } from 'react';

export const metadata = getMetadata({
  title: 'Home',
  pathname: '/',
});

export default async function HomePage() {
  const [popularMovies, sliders] = await Promise.all([
    getPopularMovies(FIRST_PAGE),
    getSliderMovies()
  ]);

  const [featuredMovie] = popularMovies.results;

  return (
    <main>
      <FeaturedMovie movies={sliders} />

      <Stack spacing={6}>
        <Divider />
        
          <Suspense
            fallback={
              <FeaturedListSectionSkeleton
                title="Popular People"
                mediaType={MediaType.PERSON}
              />
            }
          >
            <FeaturedListSection
              title="Popular People"
              mediaType={MediaType.PERSON}
              seeAllHref="/people/popular"
              promise={getPopularPeople(FIRST_PAGE)}
            />
          </Suspense>
      </Stack>
    </main>
  );
}
