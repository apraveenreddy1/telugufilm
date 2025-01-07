import { AppLayout } from '@/core/layouts/components/app-layout';
import { getMetadata } from '@/core/seo/utils';
import { BaseSWRConfig } from '@/core/swr/components/base-swr-config';
import { BaseGlobalStyles } from '@/core/theme/components/global-styles';
import { ThemeRegistry } from '@/core/theme/components/theme-registry';
import { getMovieGenres } from '@/features/movies/data';
import { TmdbConfigurationProvider } from '@/features/tmdb/components/tmdb-configuration-context';
import { getTmdbConfiguration } from '@/features/tmdb/data';

export const metadata = getMetadata({});

export default async function RootLayout({ children }) {
  const [tmdbConfiguration, genres] = await Promise.all([
    getTmdbConfiguration(),
    getMovieGenres(),
  ]);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <BaseGlobalStyles />
          <BaseSWRConfig>
            <TmdbConfigurationProvider tmdbConfiguration={tmdbConfiguration}>
              <AppLayout genres={genres}>{children}</AppLayout>
            </TmdbConfigurationProvider>
          </BaseSWRConfig>
        </ThemeRegistry>
      </body>
    </html>
  );
}
