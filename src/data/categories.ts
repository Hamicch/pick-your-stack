export interface Tool {
  id: string
  name: string
  logo: string
  logoDark?: string
}

export interface Category {
  id: string
  label: string
  subtitle: string
  diagramLayer: string
  tools: Tool[]
}

function svgl(file: string, darkFile?: string): Pick<Tool, 'logo' | 'logoDark'> {
  const base = 'https://svgl.app/library/'
  return {
    logo: base + file,
    logoDark: darkFile ? base + darkFile : undefined,
  }
}

function si(slug: string): Pick<Tool, 'logo'> {
  return { logo: `https://cdn.simpleicons.org/${slug}` }
}

function initials(text: string, bg = '636150'): Pick<Tool, 'logo'> {
  const encoded = encodeURIComponent(text)
  return {
    logo: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='6' fill='%23${bg}'/><text x='20' y='26' text-anchor='middle' fill='white' font-family='system-ui,sans-serif' font-weight='700' font-size='16'>${encoded}</text></svg>`,
  }
}

export const categories: Category[] = [
  // ── Row 1: Build ──────────────────────────────────────────
  {
    id: 'frontend',
    label: 'Frontend',
    subtitle: 'UI Framework',
    diagramLayer: 'Frontend',
    tools: [
      { id: 'nextjs', name: 'Next.js', ...svgl('nextjs_icon_dark.svg') },
      { id: 'react', name: 'React', ...svgl('react_light.svg', 'react_dark.svg') },
      { id: 'vue', name: 'Vue', ...svgl('vue.svg') },
      { id: 'nuxt', name: 'Nuxt', ...svgl('nuxt.svg') },
      { id: 'svelte', name: 'Svelte', ...svgl('svelte.svg') },
      { id: 'astro', name: 'Astro', ...svgl('astro-icon-light.svg', 'astro-icon-dark.svg') },
      { id: 'solidjs', name: 'SolidJS', ...svgl('solidjs.svg') },
      { id: 'angular', name: 'Angular', ...svgl('angular.svg') },
      { id: 'remix', name: 'Remix', ...svgl('remix_light.svg', 'remix_dark.svg') },
      { id: 'blazor', name: 'Blazor', ...svgl('dotnet.svg') },
    ],
  },
  {
    id: 'styling',
    label: 'Styling / UI',
    subtitle: 'Look & Feel',
    diagramLayer: 'Frontend',
    tools: [
      { id: 'tailwind', name: 'Tailwind CSS', ...svgl('tailwindcss.svg') },
      { id: 'shadcn', name: 'shadcn/ui', ...svgl('shadcn-ui.svg', 'shadcn-ui_dark.svg') },
      { id: 'radix', name: 'Radix UI', ...svgl('radix-ui_light.svg', 'radix-ui_dark.svg') },
      { id: 'chakra', name: 'Chakra UI', ...svgl('chakra-ui.svg') },
      { id: 'mantine', name: 'Mantine', ...svgl('mantine.svg') },
      { id: 'mui', name: 'MUI', ...svgl('materialui.svg') },
      { id: 'bootstrap', name: 'Bootstrap', ...svgl('bootstrap.svg') },
    ],
  },
  {
    id: 'backend-runtime',
    label: 'Backend Runtime',
    subtitle: 'What Runs Your Code',
    diagramLayer: 'Backend Runtime',
    tools: [
      { id: 'nodejs', name: 'Node.js', ...svgl('nodejs.svg') },
      { id: 'bun', name: 'Bun', ...svgl('bun.svg') },
      { id: 'deno', name: 'Deno', ...svgl('deno.svg', 'deno_dark.svg') },
      { id: 'python', name: 'Python (FastAPI)', ...svgl('python.svg') },
      { id: 'go', name: 'Go', ...svgl('golang.svg') },
      { id: 'ruby', name: 'Ruby on Rails', ...svgl('ruby.svg') },
      { id: 'elixir', name: 'Elixir / Phoenix', ...si('elixir') },
      { id: 'nestjs', name: 'NestJS', ...svgl('nestjs.svg') },
      { id: 'hono', name: 'Hono', ...svgl('hono.svg') },
      { id: 'aspnet', name: 'ASP.NET Core (.NET)', ...svgl('dotnet.svg') },
      { id: 'spring', name: 'Spring Boot', ...svgl('spring.svg') },
    ],
  },
  {
    id: 'hosting',
    label: 'Compute / Hosting',
    subtitle: 'Where It Lives',
    diagramLayer: 'Hosting / Compute',
    tools: [
      { id: 'vercel', name: 'Vercel', ...svgl('vercel.svg', 'vercel_dark.svg') },
      { id: 'aws-ec2', name: 'AWS EC2', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'aws-lambda', name: 'AWS Lambda', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'gcp-run', name: 'Google Cloud Run', ...svgl('google-cloud.svg') },
      { id: 'azure-app', name: 'Azure App Service', ...svgl('azure.svg') },
      { id: 'azure-functions', name: 'Azure Functions', ...svgl('azure.svg') },
      { id: 'cloudflare-workers', name: 'Cloudflare Workers', ...svgl('cloudflare.svg') },
      { id: 'flyio', name: 'Fly.io', ...svgl('fly.svg') },
      { id: 'railway', name: 'Railway', ...svgl('railway.svg', 'railway_dark.svg') },
      { id: 'render', name: 'Render', ...svgl('render_black.svg', 'render_white.svg') },
      { id: 'netlify', name: 'Netlify', ...svgl('netlify.svg') },
      { id: 'digitalocean', name: 'DigitalOcean', ...svgl('digitalocean.svg') },
    ],
  },

  // ── Row 2: Data & Identity ────────────────────────────────
  {
    id: 'database',
    label: 'Database',
    subtitle: 'Where Data Sleeps',
    diagramLayer: 'Persistence',
    tools: [
      { id: 'postgres', name: 'PostgreSQL', ...svgl('postgresql.svg') },
      { id: 'neon', name: 'Neon', ...svgl('neon.svg') },
      { id: 'supabase', name: 'Supabase', ...svgl('supabase.svg') },
      { id: 'planetscale', name: 'PlanetScale', ...svgl('planetscale.svg', 'planetscale_dark.svg') },
      { id: 'mysql', name: 'MySQL', ...svgl('mysql-icon-light.svg', 'mysql-icon-dark.svg') },
      { id: 'mongodb', name: 'MongoDB', ...svgl('mongodb-icon-light.svg', 'mongodb-icon-dark.svg') },
      { id: 'firebase', name: 'Firebase', ...svgl('firebase.svg') },
      { id: 'dynamodb', name: 'DynamoDB', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'convex', name: 'Convex', ...svgl('convex.svg') },
      { id: 'turso', name: 'Turso', ...svgl('turso-light.svg', 'turso-dark.svg') },
      { id: 'redis', name: 'Redis', ...svgl('redis.svg') },
      { id: 'sqlserver', name: 'SQL Server', ...svgl('sql-server.svg') },
      { id: 'azure-sql', name: 'Azure SQL', ...svgl('azure.svg') },
      { id: 'cosmosdb', name: 'Cosmos DB', ...svgl('azure.svg') },
    ],
  },
  {
    id: 'orm',
    label: 'ORM / Data Layer',
    subtitle: 'How You Query',
    diagramLayer: 'Persistence',
    tools: [
      { id: 'prisma', name: 'Prisma', ...svgl('prisma.svg') },
      { id: 'drizzle', name: 'Drizzle', ...svgl('drizzle-orm_light.svg', 'drizzle-orm_dark.svg') },
      { id: 'kysely', name: 'Kysely', ...initials('Ky', '2563eb') },
      { id: 'typeorm', name: 'TypeORM', ...svgl('typeorm.svg') },
      { id: 'sequelize', name: 'Sequelize', ...svgl('sequelize.svg') },
      { id: 'raw-sql', name: 'Raw SQL', ...svgl('postgresql.svg') },
      { id: 'ef-core', name: 'Entity Framework Core', ...svgl('dotnet.svg') },
    ],
  },
  {
    id: 'auth',
    label: 'Auth',
    subtitle: "Who's Logging In",
    diagramLayer: 'Identity & Storage',
    tools: [
      { id: 'clerk', name: 'Clerk', ...svgl('clerk-icon-light.svg', 'clerk-icon-dark.svg') },
      { id: 'auth0', name: 'Auth0', ...svgl('auth0.svg') },
      { id: 'supabase-auth', name: 'Supabase Auth', ...svgl('supabase.svg') },
      { id: 'nextauth', name: 'NextAuth / Auth.js', ...svgl('authjs.svg') },
      { id: 'workos', name: 'WorkOS', ...svgl('workos.svg') },
      { id: 'firebase-auth', name: 'Firebase Auth', ...svgl('firebase.svg') },
      { id: 'better-auth', name: 'Better Auth', ...svgl('better-auth_light.svg', 'better-auth_dark.svg') },
      { id: 'aws-cognito', name: 'AWS Cognito', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'entra-id', name: 'Microsoft Entra ID', ...svgl('microsoft.svg') },
    ],
  },
  {
    id: 'storage',
    label: 'File / Blob Storage',
    subtitle: 'Big Binary Stuff',
    diagramLayer: 'Identity & Storage',
    tools: [
      { id: 'aws-s3', name: 'AWS S3', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'vercel-blob', name: 'Vercel Blob', ...svgl('vercel.svg', 'vercel_dark.svg') },
      { id: 'cloudflare-r2', name: 'Cloudflare R2', ...svgl('cloudflare.svg') },
      { id: 'gcs', name: 'Google Cloud Storage', ...svgl('google-cloud.svg') },
      { id: 'azure-blob', name: 'Azure Blob', ...svgl('azure.svg') },
      { id: 'uploadthing', name: 'UploadThing', ...initials('UT', 'f0503c') },
    ],
  },

  // ── Row 3: Observe ────────────────────────────────────────
  {
    id: 'monitoring',
    label: 'Monitoring / APM',
    subtitle: 'Is It On Fire?',
    diagramLayer: 'Observability & Delivery',
    tools: [
      { id: 'sentry', name: 'Sentry', ...svgl('sentry.svg') },
      { id: 'datadog', name: 'Datadog', ...svgl('datadog.svg') },
      { id: 'newrelic', name: 'New Relic', ...si('newrelic') },
      { id: 'aws-cloudwatch', name: 'AWS CloudWatch', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'gcp-monitoring', name: 'Google Cloud Monitoring', ...svgl('google-cloud.svg') },
      { id: 'grafana', name: 'Grafana', ...svgl('grafana.svg') },
      { id: 'prometheus', name: 'Prometheus', ...si('prometheus') },
      { id: 'honeycomb', name: 'Honeycomb', ...initials('HC', '0ea5e9') },
      { id: 'axiom', name: 'Axiom', ...svgl('axiom-light.svg', 'axiom-dark.svg') },
      { id: 'betterstack', name: 'Better Stack', ...si('betterstack') },
    ],
  },
  {
    id: 'product-analytics',
    label: 'Product Analytics',
    subtitle: 'What Users Actually Do',
    diagramLayer: 'Observability & Delivery',
    tools: [
      { id: 'posthog', name: 'PostHog', ...svgl('posthog.svg') },
      { id: 'amplitude', name: 'Amplitude', ...initials('A', '0057ff') },
      { id: 'mixpanel', name: 'Mixpanel', ...si('mixpanel') },
      { id: 'heap', name: 'Heap', ...initials('H', '7b68ee') },
      { id: 'june', name: 'June', ...initials('Ju', '7c3aed') },
      { id: 'statsig', name: 'Statsig', ...initials('S', '194b7d') },
    ],
  },
  {
    id: 'web-analytics',
    label: 'Web Analytics',
    subtitle: 'Pageviews & Vitals',
    diagramLayer: 'Observability & Delivery',
    tools: [
      { id: 'vercel-analytics', name: 'Vercel Analytics', ...svgl('vercel.svg', 'vercel_dark.svg') },
      { id: 'google-analytics', name: 'Google Analytics', ...svgl('google-analytics.svg') },
      { id: 'plausible', name: 'Plausible', ...svgl('plausible.svg') },
      { id: 'fathom', name: 'Fathom', ...si('fathom') },
      { id: 'simple-analytics', name: 'Simple Analytics', ...si('simpleanalytics') },
    ],
  },
  {
    id: 'email',
    label: 'Transactional Email',
    subtitle: 'Reset Links & Receipts',
    diagramLayer: 'External Services',
    tools: [
      { id: 'resend', name: 'Resend', ...svgl('resend-icon-black.svg', 'resend-icon-white.svg') },
      { id: 'postmark', name: 'Postmark', ...initials('PM', 'ffde00') },
      { id: 'sendgrid', name: 'SendGrid', ...svgl('twilio.svg') },
      { id: 'aws-ses', name: 'AWS SES', ...svgl('aws_light.svg', 'aws_dark.svg') },
      { id: 'mailgun', name: 'Mailgun', ...si('mailgun') },
      { id: 'loops', name: 'Loops', ...si('loops') },
    ],
  },

  // ── Row 4: Integrate ──────────────────────────────────────
  {
    id: 'payments',
    label: 'Payments',
    subtitle: 'Take The Money',
    diagramLayer: 'External Services',
    tools: [
      { id: 'stripe', name: 'Stripe', ...svgl('stripe.svg') },
      { id: 'lemonsqueezy', name: 'Lemon Squeezy', ...svgl('lemonsqueezy.svg') },
      { id: 'paddle', name: 'Paddle', ...si('paddle') },
      { id: 'polar', name: 'Polar', ...initials('Po', '0062ff') },
      { id: 'paypal', name: 'PayPal', ...svgl('paypal.svg') },
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    subtitle: 'The Smart Bits',
    diagramLayer: 'External Services',
    tools: [
      { id: 'anthropic', name: 'Anthropic Claude', ...svgl('anthropic_black.svg', 'anthropic_white.svg') },
      { id: 'openai', name: 'OpenAI', ...svgl('openai.svg', 'openai_dark.svg') },
      { id: 'vercel-ai', name: 'Vercel AI Gateway', ...svgl('vercel.svg', 'vercel_dark.svg') },
      { id: 'gemini', name: 'Google Gemini', ...svgl('gemini.svg') },
      { id: 'replicate', name: 'Replicate', ...svgl('replicate_light.svg', 'replicate_dark.svg') },
      { id: 'together-ai', name: 'Together AI', ...svgl('togetherai_light.svg', 'togetherai_dark.svg') },
      { id: 'groq', name: 'Groq', ...svgl('groq.svg') },
    ],
  },
  {
    id: 'search',
    label: 'Search',
    subtitle: 'Find Stuff Fast',
    diagramLayer: 'External Services',
    tools: [
      { id: 'algolia', name: 'Algolia', ...svgl('algolia.svg') },
      { id: 'meilisearch', name: 'Meilisearch', ...si('meilisearch') },
      { id: 'typesense', name: 'Typesense', ...svgl('typesense.svg') },
      { id: 'elastic', name: 'Elastic', ...si('elastic') },
      { id: 'pgfts', name: 'Postgres FTS', ...svgl('postgresql.svg') },
    ],
  },
  {
    id: 'cms',
    label: 'CMS / Content',
    subtitle: 'Marketing & Blog',
    diagramLayer: 'External Services',
    tools: [
      { id: 'sanity', name: 'Sanity', ...svgl('sanity-light.svg', 'sanity-dark.svg') },
      { id: 'contentful', name: 'Contentful', ...si('contentful') },
      { id: 'payload', name: 'Payload', ...svgl('payload.svg', 'payload_dark.svg') },
      { id: 'strapi', name: 'Strapi', ...svgl('strapi.svg') },
      { id: 'notion', name: 'Notion', ...svgl('notion.svg') },
      { id: 'markdown-mdx', name: 'Markdown / MDX', ...svgl('markdown-light.svg', 'markdown-dark.svg') },
    ],
  },

  // ── Row 5: Ship ───────────────────────────────────────────
  {
    id: 'cicd',
    label: 'CI / CD',
    subtitle: 'Ship It',
    diagramLayer: 'Observability & Delivery',
    tools: [
      { id: 'github-actions', name: 'GitHub Actions', ...svgl('github_light.svg', 'github_dark.svg') },
      { id: 'vercel-deploys', name: 'Vercel Deploys', ...svgl('vercel.svg', 'vercel_dark.svg') },
      { id: 'circleci', name: 'CircleCI', ...si('circleci') },
      { id: 'gitlab-ci', name: 'GitLab CI', ...svgl('gitlab.svg') },
      { id: 'buildkite', name: 'Buildkite', ...si('buildkite') },
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    subtitle: 'Does It Work?',
    diagramLayer: 'Observability & Delivery',
    tools: [
      { id: 'vitest', name: 'Vitest', ...svgl('vitest.svg') },
      { id: 'jest', name: 'Jest', ...svgl('jest.svg') },
      { id: 'playwright', name: 'Playwright', ...svgl('playwright.svg') },
      { id: 'cypress', name: 'Cypress', ...svgl('cypress.svg') },
    ],
  },
]

export const diagramLayerOrder = [
  'Entry',
  'Hosting / Compute',
  'Frontend',
  'Backend Runtime',
  'Identity & Storage',
  'Persistence',
  'External Services',
  'Observability & Delivery',
]
