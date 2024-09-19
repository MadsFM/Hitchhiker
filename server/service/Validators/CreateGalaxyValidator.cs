using FluentValidation;
using service.TransferModels.Request;

namespace service.Validators;

public class CreateGalaxyValidator : AbstractValidator<CreateGalaxyDto>
{
    public CreateGalaxyValidator()
    {
        RuleFor(g => g.Name)
            .MaximumLength(100)
            .NotEmpty();

        RuleFor(g => g.Description)
            .MaximumLength(300)
            .NotEmpty();
    }
    
}