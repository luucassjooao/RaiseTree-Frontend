export function SplitNameSchool(nameSchool: string | undefined): string {
  if (!nameSchool) return '';

  return nameSchool.split(' | ')[1];
}
