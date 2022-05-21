export default interface Translatable {
  translate(sourceText: string): Promise<string>;
}
