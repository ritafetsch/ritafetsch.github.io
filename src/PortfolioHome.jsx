import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";


export default function PortfolioHome() {
  return (
    <main className="p-4 max-w-4xl mx-auto space-y-10">
      <section className="text-center space-y-4">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Hi, I'm Rita Fetsch
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Software Developer | Passionate about building clean, impactful web apps
        </motion.p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Project One",
              description: "Brief summary of the project.",
              link: "https://example.com/project1",
            },
            {
              title: "Project Two",
              description: "Brief summary of the project.",
              link: "https://example.com/project2",
            },
          ].map((project, idx) => (
            <Card key={idx} className="hover:shadow-xl transition">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-medium">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <a href={project.link} target="_blank">
                  <Button>View Project</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center pt-10 border-t">
        <p className="text-sm text-muted-foreground">
          Built using React + Tailwind + shadcn/ui
        </p>
      </section>
    </main>
  );
}
