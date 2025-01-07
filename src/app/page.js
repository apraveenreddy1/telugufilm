import { createUrl } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import {
  FeaturedListSectionSkeleton,
} from '@/features/home/components/featured-list-section';
import { MediaType } from '@/features/media/utils';
import {
  getMovieGenres,
} from '@/features/movies/data';
import { Divider, Stack } from '@mui/material';
import { Suspense } from 'react';

export const metadata = getMetadata({
  title: 'Home',
  pathname: '/',
});

export default async function HomePage() {
  const [movieGenres] = await Promise.all([
    getMovieGenres(),
  ]);


  return (
    <main>

      <Stack spacing={6}>
        <Divider />

        

        

        

        {movieGenres.slice(0, 5).map((genre) => {
          const searchParams = new URLSearchParams();
          searchParams.set('genreId', genre.id.toString());

          const title = `${genre.name} Movies`;
          const mediaType = MediaType.MOVIE;

          return (
            <Suspense
              key={genre.id}
              fallback={
                <FeaturedListSectionSkeleton
                  title={title}
                  mediaType={mediaType}
                />
              }
            >
        
            </Suspense>
          );
        })}
      </Stack>
    </main>
  );
}
